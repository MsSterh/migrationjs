module.exports = function(version, data, migrations) {
  let dataObject = data
  let v = version

  migrations.map(m => {
    dataObject = m(dataObject)
    v++
  })
  return {
    version: v,
    data: dataObject
  }
}