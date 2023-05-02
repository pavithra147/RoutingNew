module.exports=mongoose=>{
    const tutorial =mongoose.model(
        "tutuorial",
        mongoose.schema({
            title:String,
            description:String,
            published:Boolean
        },
        {timestamps:true})
    );

    schema.method("toJson",function(){
        const {_v,_id, ...object}=ths.object();
        object.id=_id;
        return object;
    });
    const Tutorial=mongoose.model("tutorial",schema);
    return tutorial;
}