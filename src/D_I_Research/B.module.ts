import {NgModule} from "@angular/core";
import {BComponent} from "./b/b.component";

import {CModule} from "./C.module";
import {TestService} from "./testService.service";

@NgModule({
  declarations: [
    BComponent
  ],
  imports: [
    CModule
  ],
  providers: [TestService],
  exports:[BComponent,CModule]
})
export class BModule { }
