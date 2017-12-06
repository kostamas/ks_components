import {NgModule} from "@angular/core";
import {CComponent} from "./b/c/c.component";
import {TestService} from "./testService.service";

@NgModule({
  declarations: [
    CComponent,
  ],
  imports: [

  ],
  providers: [TestService],
  exports:[CComponent]
})
export class CModule { }
