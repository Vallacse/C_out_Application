
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[numbersOnly]'
})

export class NumberDirective {
  constructor(private e1: ElementRef) { }

  @Input() numbersOnly: boolean = false;

  @HostListener('keydown', ['$event']) onkeydown(event:any) {
    let e = <KeyboardEvent>event;

    if (this.numbersOnly) {
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        //allow ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        //allow ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        //allow ctrl+v
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        //allow ctrl+x
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }


  }

}