import { OpenApiValidator } from 'express-openapi-validate';
import * as fs from 'fs';
import path from 'path';

export default class OpenApiValidatorProvider {
  public static getValidator() {
    const openApiSpecificationFile = path.join(
      __dirname,
      '../../static/student_city_api_OAS.json',
    );
    const openApiSpecification = fs.readFileSync(
      openApiSpecificationFile,
      'utf-8',
    );
    const openApiDocument = JSON.parse(openApiSpecification);
    return new OpenApiValidator(openApiDocument);
  }

  public static getValidatorForExample() {
    const openApiSpecificationFile = path.join(
      __dirname,
      '../../static/example_OAS.json',
    );
    const openApiSpecification = fs.readFileSync(
      openApiSpecificationFile,
      'utf-8',
    );
    const openApiDocument = JSON.parse(openApiSpecification);
    return new OpenApiValidator(openApiDocument);
  }
}
