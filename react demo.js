let globalId = 1;
let todoState = [];
let oldTodoState = [];

function createChild(title, description, id, iscomplete) {
  const child = document.createElement("div");
  child.setAttribute("id", id);

  const grandChildOne = document.createElement("div");
  grandChildOne.innerHTML = title;

  const grandChildTwo = document.createElement("div");
  grandChildTwo.innerHTML = description;

  const grandChildThree = document.createElement("button");
  if (iscomplete) {
    grandChildThree.innerHTML = "Done !";
  } else {
    grandChildThree.innerHTML = "Not Done";
  }

  child.appendChild(grandChildOne);
  child.appendChild(grandChildTwo);
  child.appendChild(grandChildThree);

  return child;
}

function addTodoToDom(state) {
  const container = document.getElementById("container");
  for (let i = 0; i < state.length; i++) {
    container.appendChild(
      createChild(
        state[i].title,
        state[i].description,
        state[i].id,
        state[i].completed
      )
    );
  }
}

function updateTodoInDom(updateArr) {
  const container = document.getElementById("container");
  let elementArr = container.children;
  console.log(elementArr);

  for (let i = 0; i < updateArr.length; i++) {
    let updateTarget = document.getElementById(updateArr[i].id);
    // console.log(updateTarget);
    let taregetElementChildList = updateTarget.children;
    for (let j = 0; j < taregetElementChildList.length; j++) {
      taregetElementChildList[0].innerHTML = updateArr[i].title;
      taregetElementChildList[1].innerHTML = updateArr[i].description;
      taregetElementChildList[2].innerHTML = updateArr[i].completed
        ? "Done !"
        : "Not Done";
    }
  }
}

function removeTodoFromDom(removedArr) {
  console.log("man");
  const container = document.getElementById("container");
  for (let i = 0; i < removedArr.length; i++) {
    let toBeRemoved = document.getElementById(removedArr[i].id);

    toBeRemoved.remove();
  }
}

function updateState(todoState) {
  let added = [];
  let deleted = [];
  let updated = [];
  if (oldTodoState.length === 0) {
    addTodoToDom(todoState);
    oldTodoState = todoState;
  } else if (
    oldTodoState.length != 0 &&
    todoState.length === oldTodoState.length
  ) {
    let diffFalg = false;
    // console.log(oldTodoState, todoState);
    console.log("it is working");
    for (let i = 0; i < oldTodoState.length; i++) {
      for (let j = 0; j < todoState.length; j++) {
        if (oldTodoState[i].id === todoState[j].id) {
          // console.log(oldTodoState[i]);
          // console.log(todoState[j]);
          let oldObjkeyArr = Object.keys(oldTodoState[i]);
          let oldObjvalueArr = Object.values(oldTodoState[i]);
          let newObjkeyArr = Object.keys(todoState[j]);
          let newObjvalueArr = Object.values(todoState[j]);

          for (let k = 0; k < oldObjvalueArr.length; k++) {
            if (oldObjvalueArr[k] != newObjvalueArr[k]) {
              diffFalg = true;
              // console.log(todoState[j]);
              updated.push(todoState[j]);
              console.log(updated);
              break;
            }
          }
        }
      }
    }
    if (diffFalg) {
      updateTodoInDom(updated);
      oldTodoState = todoState;
    }
  } else if (
    oldTodoState.length != 0 &&
    oldTodoState.length > todoState.length
  ) {
    let diffFlag = false;
    let leftArr = [];
    let commonArr = [];
    for (let i = 0; i < oldTodoState.length; i++) {
      for (let j = 0; j < todoState.length; j++) {
        if (oldTodoState[i].id === todoState[j].id) {
          leftArr.push(oldTodoState[i]);
          break;
        }
        if (j === todoState.length - 1) {
          deleted.push(oldTodoState[i]);
        }
      }
    }

    console.log(deleted);
    console.log(todoState);
    if (deleted.length != 0) {
      removeTodoFromDom(deleted);
    }
    console.log(leftArr);
    oldTodoState = leftArr;
    if (leftArr.length != 0) {
      for (let i = 0; i < todoState.length; i++) {
        for (let j = 0; j < leftArr.length; j++) {
          if (todoState[i].id === leftArr[j].id) {
            commonArr.push(leftArr[j]);
            break;
          }
          if (j === leftArr.length - 1) {
            added.push(todoState[i]);
          }
        }
      }
    } else {
      added = todoState;
    }
    addTodoToDom(added);
    oldTodoState = oldTodoState.concat(added);
    console.log("bixx");
    if (commonArr.length != 0) {
      // updateTodoInDom(commonArr);
      console.log(commonArr);
      console.log("above is common array");
      for (let i = 0; i < commonArr.length; i++) {
        for (let j = 0; j < todoState.length; j++) {
          if (commonArr[i].id === todoState[j].id) {
            let oldObjvalueArr = Object.values(commonArr[i]);
            let newObjvalueArr = Object.values(todoState[j]);

            for (let k = 0; k < oldObjvalueArr.length; k++) {
              if (oldObjvalueArr[k] != newObjvalueArr[k]) {
                diffFlag = true;
                updated.push(todoState[j]);
                // console.log(updated);
                break;
              }
            }
          }
        }
      }
    }
    if (diffFlag) {
      console.log(updated);
      updateTodoInDom(updated);
      oldTodoState = added.concat(updated);
    }
  } else if (
    oldTodoState.length != 0 &&
    oldTodoState.length < todoState.length
  ) {
    for (let i = 0; i < todoState.length; i++) {
      for (let j = 0; j < oldTodoState.length; j++) {
        if (todoState[i].id === oldTodoState[j].id) {
          break;
        }
        if (j === oldTodoState.length - 1) {
          added.push(todoState[i]);
        }
      }
    }
    addTodoToDom(added);
    oldTodoState = oldTodoState.concat(added);
  }
}

async function addTodo() {
  // // let response = await fetch("https://sum-server.100xdevs.com/todos");
  // // let data = await response.json();
  // // for (let i = 0; i < data.todos.length; i++) {
  // //   todoState.push(data.todos[i]);
  // // }
  // console.log("let's goo man");
  let response = await fetch("http://localhost:5555/getData");
  let data = await response.json();
  // console.log(data.data);
  todoState = data.data;
  updateState(todoState);
}
