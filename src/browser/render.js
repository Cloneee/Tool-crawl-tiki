const { ipcRenderer, shell } = require('electron')


document.querySelector('#exit').addEventListener('click', () => {
    ipcRenderer.send('exit', '')
})

ipcRenderer.on('open-exit-modal', (event, data)=>{
    document.querySelector('#modal-exit').classList.toggle('is-active')
})

document.querySelectorAll('.modal-background, #nope').forEach((select) => {
    select.addEventListener('click', () => {
        document.querySelector('#modal-exit').classList.toggle('is-active')
    })
})

document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        const $notification = $delete.parentNode;

        $delete.addEventListener('click', () => {
            $notification.parentNode.removeChild($notification);
        })
    })
})

document.querySelector('#openFB').addEventListener('click', ()=>{
    shell.openExternal("https://fb.com/NTH.Clone")
})