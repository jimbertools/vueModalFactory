import { ref, watch } from 'vue';

interface Modal {
    title: string;
    body: string;
}

interface State {
    index: any;
    element: any;
}

const open = ref(false);
const toggleModal = () => {
    open.value = !open.value;
};

const setTitle = (newTitle : string) => {
    title.value = newTitle;
}

const setBody = (newBody : string) => {
    body.value = newBody;
}

const title = ref('');
const body = ref('');

export default function () {
    return {
        open,
        toggleModal,
        title,
        body
    };
}

async function confirm(props: Modal): Promise<State> {
    toggleModal();

    setTitle(props.title);
    setBody(props.body);
    
    return new Promise(resolve => {
        document.addEventListener('click', function handler(e) {
            watch(open, () => {
                const target = window.event?.target as HTMLElement;
                
                const index = target.getAttribute('data-index');
                const state: State = {
                    index: index === null ? null : parseInt(index),
                    element: target,
                };

                resolve(state);
            });
        }, true);
    });
}

export { confirm };
