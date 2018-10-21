module.exports = function (app)
{
	'use strict';

	var daysOfWeekIndexes = {sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6};

	var options =
	{
		restrict: 'E',
		require:
		{
			ngModel: '?ngModel'
		},
		bindings:
		{
			config: '<',
			daysOfWeek: '<',
			onSelected: '&'
		},
		template: require('./calendarDateRangePicker.html'),
		styles: require('./calendarDateRangePicker.scss'),
		controller: 'CalendarDateRangePickerController'
	};

	app.component('calendarDateRangePicker', options).controller('CalendarDateRangePickerController', CalendarDateRangePickerController);

	CalendarDateRangePickerController.$inject = ['$element'];

	function CalendarDateRangePickerController($element)
	{
		var vm = this;
		var config = null;
		var $jqElement = $($element);
		var $calendarTemplate = $(require('./calendarTemplate.html'));
		var $calendarsContainer = $('.calendars-container', $jqElement);
		var now = moment().startOf('day').toDate();
		var currentMonth, currentYear, currentDate;
		var generatedMonths = null; // array
		var generatedDays = null; // array, representing a flatted-out version of generatedMonths
		var allowedDaysOfWeek = null;

		var markingStartTimestamp, markingStopTimestamp;
		var isMarking = false;
		var calendarWasGenerated = false;

		vm.dateRange = {};


		/* --- Public Functions --- */

		vm.$onInit = function()
		{
			debugger;
			config = _.merge(
				{
					dateFormat: '',
					modelFormat: [0, 1],
					months: 3,
					allowBackdates: true
				}, vm.config);

			if (!config.allowBackdates)
			{
				vm.datePickerMinDate = now;
			}

			if (vm.ngModel)
			{
				vm.ngModel.$render = onUpdate
			}
			else
			{
				onUpdate();
			}

			$('body').bind('mouseup', stopMarking);
		};

		vm.$onChanges = function(values)
		{
			if (values.daysOfWeek)
			{
				setAllowedDaysOfWeek();

				if (calendarWasGenerated)
				{
					onUpdate();
				}
			}
		};

		vm.$onDestroy = function()
		{
			$('body').unbind('mouseup', stopMarking);
		};

		vm.setRangeByDatepicker = function()
		{
			if (vm.dateRange.startDate)
			{
				setCalendars(vm.dateRange.startDate);
			}

			setModelValue();
		};

		vm.clearSelection = function()
		{
			vm.dateRange =
			{
				startDate: null,
				endDate: null,
			};

			setCalendars(now, true);
			setModelValue();
		};

		vm.navigateToMonth = function(offset)
		{
			setCalendars(moment(currentDate).add(offset, 'months').toDate());
		};


		/* --- Private Functions --- */

		function setAllowedDaysOfWeek()
		{
			var daysOfWeek = vm.daysOfWeek;

			if (daysOfWeek)
			{
				allowedDaysOfWeek = {};

				for (var day in daysOfWeek)
				{
					if (daysOfWeek.hasOwnProperty(day) && daysOfWeek[day])
					{
						let lcDay = day.toLowerCase();
						let dayIndex = daysOfWeekIndexes[lcDay];

						allowedDaysOfWeek[dayIndex] = true; // i.e. if {sun: true, mon: false, tue: true} then {1: true, 3: true }
					}
				}
			}
			else
			{
				allowedDaysOfWeek = {0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true};
			}
		}

		function generateMonths(fromMonth, fromYear)
		{
			var todayTimestamp = now.getTime();
			var iterationMonth = moment(fromYear+'-'+fromMonth, 'YYYY-MM');
			var iterationDay = moment(iterationMonth);
			var allowBackdates = config.allowBackdates;

			var monthDays, daysInMonth, dayOfWeek, timestamp;
			var daysCounter = 0;
			var isToday = false;
			var isBackDate = false;
			var isDayOfWeekAllowed = true;
			var isTodayWasSet = false;
			var day;

			generatedMonths = [];
			generatedDays = [];

			for (let i = 0, l = config.months; i < l; i++)
			{
				monthDays = [];

				daysInMonth = iterationMonth.daysInMonth();
				dayOfWeek = iterationMonth.day()-1;

				for (let i = 1, l = daysInMonth+1; i < l; i++)
				{
					dayOfWeek++;
					timestamp = iterationDay.valueOf();

					if (dayOfWeek > 6)
					{
						dayOfWeek = 0;
					}

					if (!isTodayWasSet && todayTimestamp >= timestamp && todayTimestamp < timestamp + 86400000)
					{
						isToday = true;
						isTodayWasSet = false;
					}
					else
					{
						isToday = false;
					}

					isBackDate = !allowBackdates && timestamp < todayTimestamp;
					isDayOfWeekAllowed = allowedDaysOfWeek[dayOfWeek];

					day =
					{
						day: i,
						dayOfWeek: dayOfWeek,
						timestamp: timestamp,
						today: isToday,
						backDate: isBackDate,
						allowedDayOfWeek: isDayOfWeekAllowed
					};

					monthDays.push(day);
					generatedDays.push(day);

					daysCounter++;
					iterationDay.add(1, 'days');
				}

				generatedMonths.push(
					{
						year: iterationMonth.year(),
						month: iterationMonth.format('MMMM'),
						days: monthDays
					});

				iterationMonth.add(1, 'months');
			}

			calendarWasGenerated = true;
		}

		function renderMonths()
		{
			var $template;
			var month;
			var day, $day;
			var daysContainer;

			$calendarsContainer.empty();

			for (let i = 0, l = generatedMonths.length; i < l; i++)
			{
				month = generatedMonths[i];

				$template = $calendarTemplate.clone();
				$('.calendar-label span', $template).html(month.month + ', ' + month.year);
				daysContainer = $('.days', $template);

				for (let i = 0, l = month.days[0].dayOfWeek; i < l; i++) // fill empty days from week start
				{
					day = month.days[i];
					$day = $('<div class="empty-day">');

					daysContainer.append($day);
				}


				for (let i = 0, l = month.days.length; i < l; i++)
				{
					day = month.days[i];

					if (day.backDate)
					{
						$day = $('<div class="disabled-day">').html(day.day);
					}
					else
					{
						$day = $('<div class="day">').html(day.day);

						if (day.today)
						{
							$day.addClass('today');
						}

						if (!day.allowedDayOfWeek)
						{
							$day.addClass('not-allowed');
						}

						$day.mousedown(startMarking.bind(null, day));
						$day.mouseenter(mark.bind(null, day));
						$day.mouseup(stopMarking.bind(null, day));
					}

					day.$element = $day;

					daysContainer.append($day);
				}

				$calendarsContainer.append($template);
			}
		}

		function setCalendars(date, clearSelected)
		{
			var startMonth = date.getMonth() + 1;
			var startYear = date.getFullYear();

			if (startMonth !== currentMonth || startYear !== currentYear)
			{
				currentMonth = startMonth;
				currentYear = startYear;
				currentDate = date;

				generateMonths(currentMonth, currentYear);
				renderMonths();
			}

			if (clearSelected)
			{
				clearSelection();
				setMarking();
			}
			else
			{
				setSelection();
				setMarking();
			}
		}

		function startMarking(dayItem) // mouse down
		{
			if (isMarking)
			{
				markingStopTimestamp = dayItem.timestamp;
				isMarking = false;
				applySelection();
			}
			else
			{
				isMarking = true;
				markingStartTimestamp = dayItem.timestamp;
				markingStopTimestamp = dayItem.timestamp;
				setMarking();
			}
		}

		function mark(day) // mouse enter
		{
			if (isMarking)
			{
				markingStopTimestamp = day.timestamp;
				setMarking();
			}
		}

		function stopMarking(dayItem, event) // mouse up
		{
			if (isMarking)
			{
				if (dayItem && event) // mouseup on a day
				{
					event.stopPropagation();

					if (dayItem.timestamp !== markingStartTimestamp)
					{
						isMarking = false;
						applySelection();
					}
				}
				else
				{
					isMarking = false;
					applySelection();
				}
			}


			/*if (isMarking && dayItem.timestamp !== markingStartTimestamp)
			 {
			 isMarking = false;
			 applySelection();
			 }*/
		}

		function toggleDayItemMarking(dayItem, toggleValue)
		{
			dayItem.$element.toggleClass('marked', toggleValue);
			dayItem.marked = toggleValue;
		}

		function applySelection()
		{
			var fromTimestamp = Math.min(markingStartTimestamp, markingStopTimestamp);
			var toTimestamp = Math.max(markingStartTimestamp, markingStopTimestamp);
			var startDate = new Date(fromTimestamp);
			var endDate = new Date(toTimestamp);

			vm.dateRange =
			{
				startDate: startDate,
				endDate: endDate,
			};

			clearMarking();
			setSelection();
			setModelValue();
		}

		function setSelection()
		{
			var startDate = vm.dateRange.startDate;
			var endDate = vm.dateRange.endDate;
			var startDateTimestamp, endDateTimestamp;
			var dayItem, dayItemTimestamp;

			if (startDate && endDate)
			{
				startDateTimestamp = startDate.getTime();
				endDateTimestamp = endDate.getTime();

				for (let i = 0, l = generatedDays.length; i < l; i++)
				{
					dayItem = generatedDays[i];
					dayItemTimestamp = dayItem.timestamp;

					if (dayItemTimestamp >= startDateTimestamp && dayItemTimestamp <= endDateTimestamp)
					{
						dayItem.$element.addClass('selected');
						dayItem.selected = true;
					}
					else
					{
						dayItem.$element.removeClass('selected');
						dayItem.selected = false;
					}
				}
			}
		}

		function setMarking()
		{
			var fromTimestamp, toTimestamp;
			var dayItem, dayItemTimestamp;

			if (markingStartTimestamp && markingStopTimestamp)
			{
				fromTimestamp = Math.min(markingStartTimestamp, markingStopTimestamp);
				toTimestamp = Math.max(markingStartTimestamp, markingStopTimestamp);

				for (let i = 0, l = generatedDays.length; i < l; i++)
				{
					dayItem = generatedDays[i];
					dayItemTimestamp = dayItem.timestamp;

					if (dayItemTimestamp >= fromTimestamp && dayItemTimestamp <= toTimestamp)
					{
						if (!dayItem.marked)
						{
							toggleDayItemMarking(dayItem, true);
						}
					}
					else
					{
						if (dayItem.marked)
						{
							toggleDayItemMarking(dayItem, false);
						}
					}
				}
			}
		}

		function clearSelection()
		{
			var dayItem;

			isMarking = false;

			for (let i = 0, l = generatedDays.length; i < l; i++)
			{
				dayItem = generatedDays[i];

				if (dayItem.selected)
				{
					dayItem.selected = false;
					dayItem.$element.removeClass('selected')
				}

				if (dayItem.marked)
				{
					toggleDayItemMarking(dayItem, false);
				}
			}
		}

		function clearMarking()
		{
			var dayItem;

			markingStartTimestamp = null;
			markingStopTimestamp = null;
			isMarking = false;

			for (let i = 0, l = generatedDays.length; i < l; i++)
			{
				dayItem = generatedDays[i];

				if (dayItem.marked)
				{
					toggleDayItemMarking(dayItem, false);
				}
			}
		}

		function generateModelValue()
		{
			var dateRange = vm.dateRange;
			var modelFormatStartDateKey = config.modelFormat[0];
			var modelFormatEndDateKey = config.modelFormat[1];
			var dateFormat = config.dateFormat;
			var result = (modelFormatStartDateKey === 0 && modelFormatEndDateKey === 1) ? [] : {};

			result[modelFormatStartDateKey] = dateRange.startDate && moment(dateRange.startDate).format(dateFormat) || undefined;
			result[modelFormatEndDateKey] = dateRange.endDate && moment(dateRange.endDate).format(dateFormat) || undefined;

			return result;
		}

		function setModelValue()
		{
			var value = generateModelValue();

			vm.ngModel && vm.ngModel.$setViewValue(value);
			vm.onSelected && vm.onSelected({selectedDateRange: value});
		}

		function onUpdate()
		{
			var modelValue = vm.ngModel && vm.ngModel.$modelValue;
			var startDate;
			var endDate;

			if (modelValue)
			{
				startDate = modelValue[config.modelFormat[0]];
				endDate = modelValue[config.modelFormat[1]];
			}

			vm.dateRange =
			{
				startDate: startDate && moment(startDate).toDate() || null,
				endDate: endDate && moment(endDate).toDate() || null,
			};

			if (vm.dateRange.startDate && vm.dateRange.endDate)
			{
				setCalendars(vm.dateRange.startDate);
			}
			else
			{
				setCalendars(now, true);
			}
		}
	}
};