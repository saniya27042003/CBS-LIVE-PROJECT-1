export const STATIC_CHILD_MAP: Record<string, string[]> = {
  acmaster: [
    'ownbranchmaster',
    'advicetran',
  ],

  customeraddress: [
    'customerdocument',
    'customercontact',
  ],

  idmaster: [
    // child
    'customeraddress',

    // masters (fixed data)
    'occupationmaster',
    'castmaster',
    'riskcategorymaster',
    'schemast',
  ],

  dpmaster: [
    'idmaster',
    'jointaclink',
    'nomineelink',
    'atteroneylink',
    'intcategorymaster',
    'categorymaster',
    'operationmaster',
    'balacata',
    'ownbranchmaster',
    'schemast',
    'pgmaster',
  ],

   lnmaster: [
    // real children
    'securitydetails',
    'guaranterdetails',
    'coborrower',
    'lnacintrate',

    // master / fixed tables
    'schemast',
    'idmaster',
    'authoritymaster',
    'intcategorymaster',
    'directormaster',
    'recoveryclearkmaster',
    'prioritymaster',
    'weakermaster',
    'purposemaster',
    'industrymaster',
    'healthmaster',
    'shmaster',
  ],


};
