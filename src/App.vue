<template>
    <img alt="Vue logo" src="./assets/logo.png" />

    <ModalFactory :open="open" @listen="listen" :title="title" :body="body" />

    <button @click="showModal">Click me!</button>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import ModalService, { confirm } from './ModalService';
    import ModalFactory from './components/ModalFactory.vue';

    export default defineComponent({
        name: 'App',
        components: {
            ModalFactory,
        },
        setup() {
            const { open, toggleModal, title, body } = ModalService();
            return {
                open,
                toggleModal,
                title,
                body,
            };
        },
        methods: {
            async showModal() {
                const props = {
                    title: 'This is a title',
                    body: 'This is a body',
                };

                const state = await confirm(props);
                console.log(state);
                
                if (state.index === 0) {
                    console.log("Canceled!");
                } else if(state.index === 1) {
                    console.log("Accepted!");
                }
            },
            listen() {
                this.toggleModal();
            },
        },
    });
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
