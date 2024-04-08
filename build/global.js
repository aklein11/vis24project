console.log("IT’S ALIVE for now!");

// remove "current" class
function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}



// document.body.insertAdjacentHTML("afterbegin", `
// 	<label class="color-scheme", position: absolute, top=1rem, right=1rem>
// 		Theme:
// 		<select>
//             <option value="light dark">Automatic</option>
//             <option value="light">Light Mode</option>
//             <option value="dark">Dark Mode</option>
// 		</select>
// 	</label>`
// );

// let select = document.querySelector("select");
// select.addEventListener("input", function (event) {
// 	console.log("color scheme changed to", event.target.value);
//     localStorage.colorScheme = event.target.value
//     document.documentElement.style.setProperty("color-scheme", event.target.value)
//     if (localStorage.colorScheme) {
//         select.value = localStorage.colorScheme;
//     }
// });
