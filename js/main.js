Vue.component('usuarios', {
    template: '#usuarios-template',
    //Al momento de cargar el componente en el DOM se ejecuta la solicitud HTTP 
    //y se guardan en un objeto solo los datos que se necesitan
    mounted(){
        axios.get('https://randomuser.me/api/?results=100')
        .then((datos) => {
            const listado = datos.data.results.map((usuario) => {
                return {
                    nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`,
                    correoe: usuario.email,
                    foto: usuario.picture.medium
                }
            });
            //Se asignan los datos al modelo usuarios
            this.usuarios = listado;
        });
    }, 
    data() {
        return {
            usuarios: [],
            busqueda: ''
        }
    }, 
    //Retorna en un array todos los usuarios que tengan un nombre parecido o igual
    //al ingresado en el input/entrada de datos
    computed: {
        filtrarUsuarios(){
            return this.usuarios.filter((usuario) => {
                return usuario.nombre.includes(this.busqueda);
            });
        }
    }
});

//Este componente renderiza 1 usuario y está anidado en el componente <usuarios>
Vue.component('usuario', {
    props: ['datos'],
    template: '#usuario-template',
});

//Para que Vue pueda acceder al DOM se declara un objeto de Vue
//Todo lo que esté adentro del tag <main> va a ser considerado por Vue
new Vue({
    el:'main'
});