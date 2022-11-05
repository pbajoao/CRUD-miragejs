import { Server } from 'miragejs';

const users = [
    {
        id: 1580385920514,
        name: 'Cibele souza',
        nasc: '10/02/1988',
        cpf: '286.916.000-39'
    },
    {
        id: 1580385928455,
        name: 'Patricia Raz',
        nasc: '25/12/1968',
        cpf: '458.344.390-04'
    },
    {
        id: 1580385936498,
        name: 'Fernando Miguel',
        nasc: '13/07/1958',
        cpf: '883.137.660-85'
    },
];

export default () => {
    new Server({
        seeds(server) {
            server.db.loadData({
                users
            });
        },

        routes() {
            this.namespace = '/api';

            this.get('/users', schema => schema.db['users']);

            this.post('/users', (schema, request) => {
                const user = JSON.parse(request.requestBody);
                user.id = Date.now();
                return schema.db['users'].insert(user);
            });

            this.put('/users', (schema, request) => {
                const user = JSON.parse(request.requestBody);
                return schema.db['users'].update(user.id, user);
            });

            this.delete('/users/:id', (schema, request) => {
                const context: any = schema.db['users'].remove(request.params['id']);
                return context;
            });
        }
    });
};
