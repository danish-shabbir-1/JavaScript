let leftBox = document.getElementById('left-side')
let rightBox = document.getElementById('right-side')
let lists = document.getElementsByClassName('list')

for (let list of lists) {
list.addEventListener("dragstart" , function(e) {
let selected = e.target

rightBox.addEventListener("dragover" , function (e) {
    e.preventDefault()
})
rightBox.addEventListener("drop", function (e) {
    rightBox.appendChild(selected)
    selected = null
})
leftBox.addEventListener("dragover" , function (e) {
    e.preventDefault()
})
leftBox.addEventListener("drop", function (e) {
    leftBox.appendChild(selected)
    selected = null
})
})
}