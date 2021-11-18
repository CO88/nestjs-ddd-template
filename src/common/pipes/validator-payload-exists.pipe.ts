import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidatePayloadExists implements PipeTransform {
  transform(payload: any): any {
    if (Object.keys(payload).length === 0) {
      throw new BadRequestException();
    }

    return payload;
  }
}
