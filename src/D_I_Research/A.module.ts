import {NgModule} from "@angular/core";
import {AComponent} from "./a/a.component";
import {BModule} from "./B.module";
import {TestService} from "./testService.service";

@NgModule({
  declarations: [
    AComponent,
  ],
  imports: [
    BModule
  ],
  exports:[AComponent],
  providers:[TestService]
})
export class AModule { }
