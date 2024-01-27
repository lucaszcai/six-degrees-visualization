import React, { useState, useRef, useEffect } from "react";
import {
  ForceGraph2D,
  ForceGraph3D,
  ForceGraphVR,
  ForceGraphAR
} from "react-force-graph";

import { getFirestore, collection, getDocs } from 'firebase/firestore';


import * as THREE from 'three';

function generateAdjMap(users) {
    // console.log("in generate map", users)
    var adj_map = new Map();

    for (let [key, value] of users) {
        // console.log(key + " is " + value.connections);
        adj_map.set(key, value.connections);
    }
    // console.log(users)
    // for (var i = 0; i < users.length; i++) {
    //     var connections = users[i].connections;
    //     console.log("connections", connections);
    //     var connection_usernames = [];
    //     for (var j = 0; j < connections.length; j++) {
    //         connection_usernames.push(connections[j].username);
    //     }
    //     adj_map.set(users[i].id, connection_usernames);
    // }
    return adj_map;
}

function FriendGraph({db}) {
    
    // var allusers = [];
    // allusers = await getUsers(db);
    // // getUsers(db).then((users) => {
    // //     console.log(users);
    // //     allusers = users;
    // //   });

    //   console.log(allusers.length)

    const [users, setUsers] = useState([]);


    useEffect(() => {
        async function getUsers(db) {
            console.log("getting users called")
            const usersCol = collection(db, 'users');
          
            const userSnapshot = await getDocs(usersCol);
            const userList = userSnapshot.docs.map(doc => doc.data());
            // turn usersnapshopt into a map
            console.log("usersnap", userSnapshot)
            var userid_map = new Map();
            userSnapshot.forEach(doc => {
                userList.push(doc.data());
                userid_map.set(doc.id, doc.data());
            });
            
            return userid_map;
          }
    
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (users.length == 0) {
            console.log("getting users")
            getUsers(db).then((users) => {
                console.log(users);
                setUsers(users);
                var adj_map = generateAdjMap(users);
                console.log("map", adj_map)
            });

        
        }
      }, []);

   

    const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black", "white"]
    // const imgs = ["https://firebasestorage.googleapis.com/v0/b/degrees-75d2f.appspot.com/o/profilepics%2F18.jpg?alt=media&token=413187a7-94b3-4af9-86bd-dea6788a9f29", require("./images/user2.jpeg"), require("./images/user3.jpeg"), require("./images/user4.jpeg"), require("./images/user5.jpeg")]

    const N = users.length;

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    })
    
    const cube = new THREE.Mesh(geometry, material)
    // console.log(THREE.isObject3D(cube));

    const gData = {
        nodes: [],
        links: []

        // nodes: [...Array(N).keys()].map(i => ({
        //     id: i,
        //     name: i,
        //     color: colors[i % 10],
        //     img: users[i].picurl
        // })),
        // links: [...Array(N).keys()]
        //   .filter(id => id)
        //   .map(id => ({
        //     source: id,
        //     target: Math.round(Math.random() * (id-1)),
        //     color: colors[Math.round(Math.random() * (colors.length-1))]
        //   }))
    }
    for (let [key, value] of users) {
        gData.nodes.push({
            id: key,
            name: value.username,
            color: colors[Math.round(Math.random() * (colors.length-1))],
            img: value.picurl
        });

        console.log("connections ", value.connections)

        for (var i = 0; i < value.connections.length; i++) {
            console.log("target", value.connections[i])

            gData.links.push({
                source: key,
                target: value.connections[i],
                color: colors[Math.round(Math.random() * (colors.length-1))]
            });
        }
    }

    console.log("nodes", gData.nodes);
    console.log("links", gData.links);


  return (
    <ForceGraph3D
        graphData={gData}
        linkDirectionalParticleColor={() => "#52ACFF"}
        linkDirectionalParticleWidth={1}
        linkDirectionalParticles={1}
        linkWidth={0.2}
        linkOpacity={0.8}
        linkColor={() => "#083d70"}
        nodeThreeObject={node => {
            // const textureImage = require("./images/user1.jpeg");
            // const textureImage = require((imgs[0]));

            // const imgTexture = new THREE.TextureLoader().load(`https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg`);
            const imgTexture = new THREE.TextureLoader().load(node.img);
            imgTexture.colorSpace = THREE.SRGBColorSpace;
            const material = new THREE.SpriteMaterial({ map: imgTexture });
            
            const geometry = new THREE.BoxGeometry(5, 2, 5)
            
            // const sprite = new THREE.Mesh(geometry, material);
            const sprite = new THREE.Sprite(material);
            
            sprite.scale.set(12, 12, 12);
            return sprite;


            // gen shapes
            // const geometry = new THREE.BoxGeometry()
            // const material = new THREE.MeshBasicMaterial({
            //     color: 0x00ff00,
            //     wireframe: true,
            // })
            
            // // const sprite = new THREE.Mesh(
            // //     node.nodeThreeObject,
            // //     new THREE.MeshBasicMaterial({ color: node.color })
            // // )
            // const sprite = new THREE.Mesh(geometry, material)
            // return sprite
        }}
    />
  );
  }
  
  export default FriendGraph;
  