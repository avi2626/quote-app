const express=require('express');
const router=express.Router();
const auth=require('../../middlewere/auth');

const Quote=require('../../modules/quote');
//get a quote
router.post('/get',(req,res)=>{

    Quote.find({id:req.body.id})
    .then(items=>res.json(items));
})
//post a qoute
router.post('/',auth,(req,res)=>{
const newQuote=new Quote({
    quote:req.body.quote,
    author:req.body.author,
    rate:"2.5",
    id:req.body.id
});
Quote.findOne({ quote:req.body.quote,id:req.body.id })
.then(quote => {
if(quote){return res.status(400).json({ msg: 'quote already exists' })};
newQuote.save().then(item=>res.json(item))})
})
//delete a qoute
router.delete('/:id',auth,(req,res)=>{
Quote.findById(req.params.id)
.then((quote)=>quote.remove().then(()=>res.json({success:true})))
.catch(err => res.status(404).json({ success: false }));
});

router.put('/:id',(req,res)=>{
    Quote.findByIdAndUpdate(req.params.id,{rate:req.body.rate})
    .then(()=>res.json({success:true}))
    .catch(err => res.status(404).json({ success: false }));
    })


module.exports=router;