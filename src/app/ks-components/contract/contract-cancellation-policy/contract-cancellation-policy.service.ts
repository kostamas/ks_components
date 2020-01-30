import {CreateOneContractStoreService} from '../create-one-contract-store.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {take} from 'rxjs/operators';
import {ISelectItem, IValidationStatus} from '../../../shared/types/ISelect';
import {ICancellationPolicyParams, ISectionPageService} from '../one-contract';
import {ICancellationFee, ICancellationPolicy, IOneContractParams} from '../one-contract-object';

@Injectable()
export class ContractCancellationPolicyService implements ISectionPageService {
  public validation: BehaviorSubject<IValidationStatus> = new BehaviorSubject<IValidationStatus>(null);
  public contractCancellationPolicyPrams: ICancellationPolicyParams = <ICancellationPolicyParams>{
    isNRF: false,
    tableRows: []
  };
  public seasonsOptions: ISelectItem[] = [];
  public isDirty: boolean = false;

  constructor(private oneContractStoreService: CreateOneContractStoreService) {
  }

  resetParams = (): void => {
    this.contractCancellationPolicyPrams = <ICancellationPolicyParams>{isNRF: false, tableRows: []};
  };

  updateOneContract = (oneContract: IOneContractParams) => {
    oneContract.contractData.cancellationPolicy = <ICancellationPolicy>{
      isNRF: this.contractCancellationPolicyPrams.isNRF,
      fees: []
    };
    if (!this.contractCancellationPolicyPrams.isNRF) {
      this.contractCancellationPolicyPrams.tableRows.forEach(cancellation => {
        oneContract.contractData.cancellationPolicy.fees.push(<ICancellationFee>
          {
            days: cancellation.type === 'NS' ? 0 : cancellation.days,
            type: cancellation.penalty,
            rule: cancellation.rule,
            time: cancellation.time,
            seasons: cancellation.type === 'NS' ? [] : cancellation.seasonCode
          });
      });
    }
  };

  validateSection = (): Subject<boolean> => {
    let isValid = true;
    let message = '';
    const isValidSubject: Subject<boolean> = new Subject();

    let seasonWithPolicyCounter = 0;
    if (!this.contractCancellationPolicyPrams.isNRF && this.isDirty) {
      this.oneContractStoreService.contractSeasons$.pipe(take(1)).subscribe(seasons => {
        this.contractCancellationPolicyPrams.tableRows.forEach(params => {
          if (params.days !== 0) {
            seasonWithPolicyCounter += params.seasonCode ? params.seasonCode.length : 0;
          }
        });
        const numOfSeasons = seasons.reduce((prev, curr) => curr.selectedSeasonType === 'A' ? prev + 1 : prev + 2, 0);
        if (seasonWithPolicyCounter < numOfSeasons) {
          isValid = false;
          message = 'Cancellation Policy was not defined for the entire contract period';
        }
      });
    }

    setTimeout(() => {
      this.validation.next({isValid, message});
      isValidSubject.next(isValid);
      isValidSubject.complete();
    });

    return isValidSubject;
  };
}
