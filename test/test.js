import R from 'ramda'

const data0 = require('../data/test-data0')
const data1 = require('../data/test-data1')
const data2 = require('../data/test-data2')
const fn = require('../lib/index')

const migration1 = (data) => (R.assoc('token', '123', data))

const migration2 = (data) => (
  R.assocPath(['user'], {full_name: `${data.user.name} ${data.user.surname}`}, data)
)

const migrations = [migration1, migration2]

const versionData = (version, data) => ({
  version: version,
  data: data
})

describe('One migration', () => {
  it('should migrate correctly', () => {
    expect(fn(0, data0, [migration1])).toEqual(versionData(1, data1))
  })
})

describe('One migration', () => {
  it('should migrate correctly', () => {
    expect(fn(1, data1, [migration2])).toEqual(versionData(2, data2))
  })
})

describe('Two migrations', () => {
  it('should migrate correctly', () => {
    expect(fn(0, data0, migrations)).toEqual(versionData(2, data2))
  })
})
