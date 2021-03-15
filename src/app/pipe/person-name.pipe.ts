import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personName'
})
export class PersonNamePipe implements PipeTransform {

  transform(value: string, args: string): any {
    if (!args) {
      return value
    }
    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, `<span class='highlight'>${match[0]}</span>`);
  }

}
