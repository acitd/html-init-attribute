function process_init_attributes(el){
	const code=el.getAttribute('init');
	if(code)
		try{
			el.init=new Function(code);
			el.init()
		}
		catch(error){
			console.error("Error executing init attribute:", error);
		}
}
window.addEventListener('DOMContentLoaded',()=>{
	const els=[...document.querySelectorAll('[init]')];
	els.reverse();
	els.forEach(process_init_attributes);
});
const init_attributes_observer=new MutationObserver(mutations=>
	mutations.forEach(mutation=>
		mutation.addedNodes.forEach(node=>{
			if(node.nodeType===1&&node.hasAttribute('init'))
				process_init_attributes(node);
		})
	);
);
window.addEventListener('DOMContentLoaded',()=>
	init_attributes_observer.observe(document.body,{childList:true,subtree:true})
);
