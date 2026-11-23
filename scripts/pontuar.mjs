import {propertyComparisons} from 'figma-delta/src/properties.js';
export function pontuar(scope, report) {
  if (!Array.isArray(report.regions)) throw Error('Use o report.json completo do Delta.');
  const checks = [];
  for (const [name, properties] of Object.entries(scope)) {
    if (!Array.isArray(properties) || new Set(properties).size !== properties.length) throw Error('Escopo inválido');
    const regions = report.regions.filter(region => region.name === name);
    const region = regions.length === 1 && regions[0];
    const rows = region?.actual && region?.expected ? propertyComparisons(region.actual,region.expected) : [];
    for (const property of properties) {
      if (['x','y','width','height'].includes(property)) throw Error('Use somente propriedades de estilo neste adaptador.');
      const row = rows.find(row => row.property === property && row.group === 'style');
      const status = row?.expected != null && row?.actual != null && ['different','match'].includes(row.status) ? row.status : 'unavailable';
      checks.push({name,property,status,expected:row?.expected ?? null,actual:row?.actual ?? null});
    }
  }
  if (!checks.length) throw Error('Escopo vazio');
  const passed = checks.filter(c=>c.status==='match').length;
  const failed = checks.filter(c=>c.status==='different').length;
  return {total:checks.length,conformes:passed,divergentes:failed,inconclusivas:checks.length-passed-failed,conformidade:100*passed/checks.length,cobertura:100*(passed+failed)/checks.length,checks};
}
