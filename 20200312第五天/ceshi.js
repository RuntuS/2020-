function foo(newFun)
{
    newFun({a : 1});
}

foo((b) => {
    console.log(b);
})


