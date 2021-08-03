// importacao das libs
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'query-string'
import * as url from 'url'
import { writeFile } from 'fs'

const port = 5000

// criar o servidor
const server = createServer((request: IncomingMessage, response: ServerResponse) => { // funcao anonima, ou sejam que nao preciso executar codigo, apenas passar os parametros

    var resposta
    const urlparse = url.parse(request.url ? request.url : '', true)

    // receber informaçoes de ususario
    const params = parse(urlparse.search ? urlparse.search : '')

    // criar e atualizar ususario
    if (urlparse.pathname == '/criar-atualizar-usuario') {

        // salvar as informacoes
        writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
            if (err) throw err
            console.log('Saved!')

            resposta = 'usuario criado/atualizado com sucesso'

            response.statusCode = 200
            response.setHeader('Content-Type', 'text/plain')
            response.end(resposta)
        })

    }



    // response.end('oi')// javascript é assincrono
})

// execução
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})