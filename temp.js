function curry(fn){
    console.log('curry函数fn是什么？',fn);
    console.log('curry函数fn.length是什么？',fn.length);
    const n = 10000
    if(fn.length <= 1) return fn
    const generator = (...args) =>{
        console.log('----------------')
        console.log('nnnnnn',n)
        console.log('调用了+1');
        console.log('**fn是什么？',fn);
        console.log('^^fn.length是什么？',fn.length);
        console.log('%%curry函数...args是什么？',...args);
        console.log('$$curry函数args是什么？args.length',args,args.length);
        if(fn.length === args.length){
            return fn(...args)
        }else{
            return (...args2)=>{
                return generator(...args,...args2)
            }
        }
    }
    return generator
}


let add = (a,b,c,d ) => a+b+c+d
const curriedAdd = curry(add)
curriedAdd(5)(6)(7)(8)

add(5,6,7,8)
