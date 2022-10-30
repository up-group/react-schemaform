import { configure } from 'enzyme';
import { groupByRow } from '../UpSchemaObject';
import * as _ from 'lodash';

const ReactSixteenAdapter = require('enzyme-adapter-react-16');

configure({ adapter: new ReactSixteenAdapter() });

describe('UpSchemaObject', () => {
  it('Should arrange the viewModels by 2 rows of 3 and 2 elements respectively', () => {
    let items = [{
      colspan: 8,
      order: 1,
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      isSeparator: false, 
      breakAfter : true
    }] ;

    let rows = groupByRow(items, 6) ;
    
    expect(rows[0].length).toEqual(3)
    expect(rows[1].length).toEqual(2)
  });

  it('Should arrange the viewModels by 2 rows of 2 and 3 elements respectively', () => {
    let items = [{
      colspan: 8,
      order: 1,
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      group: "Mon groupe",
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      isSeparator: false,
      group: "Mon groupe"
    },{
      colspan: 8,
      order: 1,
      isSeparator: false
    },{
      colspan: 8,
      order: 1,
      group: "Mon groupe",
      isSeparator: false, 
      breakAfter : true
    }] ;

    let rows = groupByRow(items, 6) ;
    
    expect(rows[0].length).toEqual(2)
    expect(rows[1].length).toEqual(3)
  });
});
