<template>
   <div class="todo">
      <div class="title has-text-centered">Badass Todo</div>

      <form @submit.prevent="addTodo">
         <div class="field is-grouped mb-5">
            <p class="control is-expanded">
               <input class="input" type="text" placeholder="Add a todo" v-model="newTodoContent" />
            </p>
            <p class="control">
               <button :disabled="!newTodoContent" class="button is-primary">Add</button>
            </p>
         </div>
      </form>

      <div
         class="card mb-4"
         v-for="todo in todos"
         :key="todo.id"
         :class="{ 'has-background-success-light': todo.done }"
      >
         <div class="card-content">
            <div class="content">
               <div class="columns is-mobile is-vcentered">
                  <div class="column" :class="{ 'has-text-success line-through': todo.done }">
                     {{ todo.content }}
                  </div>
                  <div class="column is-4 has-text-right">
                     <button class="button" :class="todo.done ? 'is-success' : 'is-light'" @click="toggleDone(todo.id)">
                        &check;
                     </button>
                     <button class="button is-danger ml-2" @click="deleteTodo(todo.id)">&cross;</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
// Imports
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

// firebase refs

const todosCollectionsRef = collection(db, "todos");

const todos = ref([
   // {
   //    id: "id1",
   //    content: "",
   //    done: false,
   // },
   // {
   //    id: "id2",
   //    content: "dsa",
   //    done: true,
   // },
]);

// Get todos

onMounted(() => {
   onSnapshot(todosCollectionsRef, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
         const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done,
         };
         fbTodos.push(todo);
      });
      todos.value = fbTodos;
   });
});

// Add todo

const newTodoContent = ref("");

const addTodo = () => {
   addDoc(todosCollectionsRef, {
      content: newTodoContent.value,
      done: false,
   });
   newTodoContent.value = "";
};

// Delete todo

const deleteTodo = (id) => {
   deleteDoc(doc(todosCollectionsRef, id));
};

// Toggle Done

const toggleDone = (id) => {
   const index = todos.value.findIndex((todo) => todo.id === id);
   todos.value[index].done = !todos.value[index].done;
};
</script>

<style>
@import "bulma/css/bulma.min.css";

.todo {
   max-width: 500px;
   padding: 20px;
   margin: 0 auto;
}

.card {
   box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
   border-radius: 10px;
}

.line-through {
   text-decoration: line-through;
}
</style>
