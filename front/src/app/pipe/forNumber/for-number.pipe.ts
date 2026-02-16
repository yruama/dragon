import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'forNumber',
    standalone: false
})
export class ForNumberPipe implements PipeTransform {
	transform(value: any): any {
		const res = [];
		for (let i = 0; i < value; i++) {
			res.push(i);
		}

		return res;
	}
}
