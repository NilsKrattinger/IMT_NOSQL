const type = 'neo4j'


function parseRes(res){
    const rows = res.records;
    const parsedRes = []

    for (const rowsKey in rows) {
        const row = rows[rowsKey]
        const parsedObj= {}
        for (const field in row._fieldLookup) {
            parsedObj[field] = row._fieldLookup[field]
        }
        parsedRes.push(parsedObj)
    }

    console.log(parsedRes)
    return parsedRes
}


module.exports = {parseRes,type}
