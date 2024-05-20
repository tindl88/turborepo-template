import { SnakeNamingStrategy } from '../snake-naming-strategy.util';

it('[tableName] should return custom name if it exists', () => {
  const strategy = new SnakeNamingStrategy();
  const result = strategy.tableName('TableName', 'CustomTableName');

  expect(result).toBe('CustomTableName');
});

it('[tableName] should return className in snake_case if custom name is not provided', () => {
  const strategy = new SnakeNamingStrategy();
  const result = strategy.tableName('TableName', null);

  expect(result).toBe('table_name');
});

it('[columnName] should return snake_case of ColumnName with embeddedPrefixes', () => {
  const strategy = new SnakeNamingStrategy();
  const result = strategy.columnName('ColumnName', null, ['embedded']);

  expect(result).toBe('embedded_column_name');
});

it('[columnName] should return snake_case of ColumnName', () => {
  const strategy = new SnakeNamingStrategy();
  const result = strategy.columnName('ColumnName', null, []);

  expect(result).toBe('column_name');
});

it('[columnName] should return customName', () => {
  const strategy = new SnakeNamingStrategy();
  const result = strategy.columnName('ColumnName', 'CustomColumnName', []);

  expect(result).toBe('CustomColumnName');
});

it('[columnName] should return empty string', () => {
  const strategy = new SnakeNamingStrategy();
  const result = strategy.columnName('', null, []);

  expect(result).toBe('');
});

it('[relationName] should return snake_case of relationName', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const propertyName = 'validPropertyName';
  const result = snakeNamingStrategy.relationName(propertyName);

  expect(result).toBe('valid_property_name');
});

it('[relationName] should return an empty string', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const propertyName = '';
  const result = snakeNamingStrategy.relationName(propertyName);

  expect(result).toBe('');
});

it('[joinColumnName] should return snake_case of relationName and referencedColumnName', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.joinColumnName('relationName', 'ReferencedColumnName');

  expect(result).toBe('relation_name_referenced_column_name');
});

it('[joinColumnName] should return snake_case of referencedColumnName', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.joinColumnName('', 'referencedColumnName');

  expect(result).toBe('_referenced_column_name');
});

it('[joinColumnName] should return snake_case of relationName', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.joinColumnName('relationName', '');

  expect(result).toBe('relation_name_');
});

it('[joinTableName] should return a string with the expected format when given valid input parameters', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.joinTableName('table1', 'table2', 'property');

  expect(result).toBe('table1_property_table2');
});

it('[joinTableColumnName] should concatenate tableName and propertyName with an underscore if columnName is not provided', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.joinTableColumnName('table', 'property');

  expect(result).toBe('table_property');
});

it('[joinTableColumnName] should concatenate tableName and columnName with an underscore if columnName is provided', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.joinTableColumnName('table', 'property', 'column');

  expect(result).toBe('table_column');
});

it('[classTableInheritanceParentColumnName] should return a string in snake_case format when parentTableName and parentTableIdPropertyName are provided', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const result = snakeNamingStrategy.classTableInheritanceParentColumnName('ParentTable', 'ParentTableId');

  expect(result).toBe('parent_table_parent_table_id');
});

it('[eagerJoinRelationAlias] should concatenate the alias and propertyPath with "__" separator', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();

  const result = snakeNamingStrategy.eagerJoinRelationAlias('alias', 'property.path');

  expect(result).toBe('alias__property_path');
});
