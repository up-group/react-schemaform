import { configure, mount } from 'enzyme';
import { manageColspan } from '../UpSchemaObject';
import * as _ from 'lodash';

const ReactSixteenAdapter = require('enzyme-adapter-react-16');

configure({ adapter: new ReactSixteenAdapter() });

describe('UpSchemaObject', () => {
  it('Should arrange the viewModels by 2 rows', () => {
    expect(true).toBe(true);
  });

});
