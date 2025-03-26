//Back end server
import fastify from "fastify";

const server = fastify();

let localStorage = [
  {id:1, nama: "Ole"},
  {id:2, nama: "Barhain"},
  {id:3, nama: "Shin Tae Yong"},
  {id:4, nama: "Bima Sakti"}
];

interface ItemParams {
  id: string; 
}

interface AddItemParams {
  nama: string;
}

server.get('/test', async (request, reply) => {
    return {msg:"Fastify jalan boss"};
}
);  

server.get('/data', async (request, reply) => {
    return {items: localStorage};
}
);

server.get<{ Params: ItemParams }>('/data/:id', async (request, reply) =>{
    const { id } = request.params;
    const data = localStorage.find(e => e.id == Number(id));

    if(!data){
      reply.status(404).send({error:"Nama ga ada"});
    }

    return data;
});

server.post<{ Params: AddItemParams }>('/AddData/:nama', async (request, reply) => {
  const { nama } = request.params;
  if(!nama){
    return reply.status(400).send({ error: "G ada nama" });
  }
  const newNama = { id: localStorage.length + 1, nama };
  localStorage.push(newNama);

  reply.status(201).send(newNama);
});

server.listen({port: 3000, host: '0.0.0.0'}, (err, address)=>{

    if(err){
      console.log("error nih bos");
      console.log(err);
    }
    console.log(`server jalan di ${address}`);
});


/* 
How to use
===============
1. to get data http://localhost:3000/data pake curl kalo mau di terminal
2. to get data by id http://localhost:3000/items/1
3. to add data http://localhost:3000/Additem/Dion

*/