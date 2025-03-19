import {test,expect, APIResponse} from '@playwright/test'

test("get users list",async({request})=>{
    let response:APIResponse;
    await test.step("get the user list",async()=>{

          response= await request.get("https://reqres.in/api/users?page=2");
          const responseBody=await response.json();
          console.log(responseBody);
          let dataLength=responseBody.data.length;             
          console.log('lenght',dataLength);
          expect(response.status()).toBe(200);          
           
        //5.kullanıcı bilgilerini getirdik:
          const fifthUser = responseBody.data.at(4);
          /**
            const fifthUser = responseBody.data[4]; -->Klasik [] Notasyonu (Eski Yöntem)
            Çoğu durumda kullanılabilir, ancak negatif indeksleri desteklemez.
            Eğer dizinin boyutu 5’ten küçükse, undefined döndürür.
            Ancak yukarıdaki gibi at(4) kullanımı modern ve güvenli bir yöntemdir.
            Çünkü Negatif indeks desteği vardır, yani at(-1) ile son elemanı alınabilir.
            Örneğin: array.at(-1) → dizinin son elemanını döndürür.
            Kod okunabilirliği açısından daha iyidir.
           */
        
          console.log("5. Kullanici Bilgileri:");
          console.log(`ID: ${fifthUser?.id}`);
          console.log(`Ad: ${fifthUser?.first_name}`);
          console.log(`Soyad: ${fifthUser?.last_name}`);
          console.log(`Email: ${fifthUser?.email}`);
          console.log(`Avatar: ${fifthUser?.avatar}`);
        
          expect(response.status()).toBe(200); //assertion
    })
})

/**
 * {
    "page": 2,
    "per_page": 6,
    "total": 12,
    "total_pages": 2,
    "data": [
        {
            "id": 7,
            "email": "michael.lawson@reqres.in",
            "first_name": "Michael",
            "last_name": "Lawson",
            "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
            "id": 8,
            "email": "lindsay.ferguson@reqres.in",
            "first_name": "Lindsay",
            "last_name": "Ferguson",
            "avatar": "https://reqres.in/img/faces/8-image.jpg"
        },
        {
            "id": 9,
            "email": "tobias.funke@reqres.in",
            "first_name": "Tobias",
            "last_name": "Funke",
            "avatar": "https://reqres.in/img/faces/9-image.jpg"
        },
        {
            "id": 10,
            "email": "byron.fields@reqres.in",
            "first_name": "Byron",
            "last_name": "Fields",
            "avatar": "https://reqres.in/img/faces/10-image.jpg"
        },
        {
            "id": 11,
            "email": "george.edwards@reqres.in",
            "first_name": "George",
            "last_name": "Edwards",
            "avatar": "https://reqres.in/img/faces/11-image.jpg"
        },
        {
            "id": 12,
            "email": "rachel.howell@reqres.in",
            "first_name": "Rachel",
            "last_name": "Howell",
            "avatar": "https://reqres.in/img/faces/12-image.jpg"
        }
    ],
    "support": {
        "url": "https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral",
        "text": "Tired of writing endless social media content? Let Content Caddy generate it for you."
    }
}
 */