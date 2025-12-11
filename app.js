
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default;
const schema = require('./schema/schema');
const app = express();

app.use('/graphql', createHandler({
    schema,
    graphiql: true
}));

app.get('/playground', expressPlayground({
    endpoint: 'http://127.0.0.1:3001/rpc/graphql',
    headers: {
        'Accept': 'application/json'
    },
    settings: {
        'general.betaUpdates': false,
        'editor.cursorShape': 'line',
        'editor.theme': 'dark',
        'editor.reuseHeaders': true,
        'tracing.hideTracingResponse': true,
        'queryPlan.hideQueryPlanResponse': true,
        'editor.fontSize': 14,
        'editor.fontFamily': "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
        'request.credentials': 'omit',
    }
}));


app.get('/', (req, res) => {
    res.redirect('/playground');
});

app.listen(12020, () => {
    console.log('GraphQL server running on port 12020');
    console.log('Local GraphQL endpoint: http://localhost:12020/graphql');
    console.log('External GraphQL Playground: http://localhost:12020/playground (connects to 127.0.0.1:3001/rpc/graphql)');
});