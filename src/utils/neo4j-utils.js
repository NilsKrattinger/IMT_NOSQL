const type = 'neo4j'


function parseRes(res){
    console.log(JSON.stringify(res))

    const rows = res.records;
    const parsedRes = []

    for (const rowsKey in rows) {
        const row = rows[rowsKey]
        console.log(JSON.stringify(row))
        const parsedObj= {}
        for (const field in row._fieldLookup) {
            parsedObj[field] = row._fields[0]["low"]
        }
        console.log(JSON.stringify(parsedObj))

        parsedRes.push(parsedObj)
    }
    return parsedRes
}


module.exports = {parseRes,type}
