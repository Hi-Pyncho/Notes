const el = <h1>hello!</h1>
// за кулисами Babel преобразует это в такой код
const el = React.createElement('h1', null, 'hello!')
//поэтому нужно подключать React везде, где пользуемся JSX

// VirtualDOM
// JSX возвращает объект, который гораздо меньше по размеру, чем нативный объект в DOM. За счет этого больше скорость загрузки

//грубо говоря, этот метод превращает JSX элемент в
// объект разметки, который отображается на странице
ReactDOM.render(el, document.getElementById('root'))

//называть компоненты с большой буквы
// так React понимает, что это компонент, а не тэг

//если элемент возвращает null/undefined/true/false, то JSX игнорирует
// и не отрисовывает


const list = todos.map((item) => {
  return (
    <li key={index}>
      <TodoListItem 
        label = {item.label}
        important = {item.important}
      />
    </li>
  )
})
// можно использовать spread оператор для передачи всех свойств
const list = todos.map((item) => {
  return (
    <li key={index}>
      <TodoListItem {... item}/>
    </li>
  )
})

// каждый раз когда react рендерит приложение, он пытается
// определить, какие именно элементы изменились и обновить
// только эти части страницы. повышается производительность
// поэтому важно прописывать элементам KEY. и этот процесс
// поиска изменений называется reconciliation algorithm (алгоритм сравнения)

// если нужно разделить данные объекта, чтобы передать часть
// объекта без определенного свойства, можно воспользоваться
// таким синтаксисом
const {id, ...itemProps} = item
//в итоге мы не передаем ненужных свойств, а выносим его
// в отдельную переменную

//setState может быть ассинхронной
// поэтому можно вычислить новый state в зависимости от того
// какой текущий state, нужно использовать такую форму
//передавая текущий state в функцию
onMarkImportant = () => {
  this.setState(({important}) => {
    return {
      important: !important
    }
  })
}

//uncontrolled elements - вроде инпута. 
// но можно сделать их контролируемыми - надо сделать,
// чтобы значение элемента устанавливалось состоянием компонента (input(value))