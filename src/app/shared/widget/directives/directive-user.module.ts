
import { NgModule } from '@angular/core';
import { NumberSeparatorDirective } from './number-separator.directive';
import { GetFileInfoDirective } from './get-file-info.directive';

@NgModule({
  declarations: [
    // Declare
    NumberSeparatorDirective,
    GetFileInfoDirective
  ],
  imports: [
  ],
  exports: [
    // Then export
    NumberSeparatorDirective,
    GetFileInfoDirective
  ],
  providers: []
})
export class DirectiveUserModule { }
