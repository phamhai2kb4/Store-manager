const endpoints = {
    v1: {
        getinfo: () => '/v2',
        getUser: () => '/api/users/',
        product: () => '/api/products/',
        login: () => '/api/users/login/',
        register: () => '/api/users/signup/',
        order: () => '/api/orders/',
        upload: () => '/api/uploads/',
        category: () => '/api/categories/',
        cart: () => '/api/carts/'
    }
}
export default endpoints