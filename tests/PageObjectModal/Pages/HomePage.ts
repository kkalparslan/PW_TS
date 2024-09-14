import { Page, Expect } from "@playwright/test"; //page ve expecti import ettik

/**
burada bir class oluşturcağız ve bu classın dışarıya açık olması yani erişilebilir olması gerekecek
(dışarıdan çağırılabilecek). bunun için öncelikle export keyword unu kullanıyoruz. classın public 
olması için default keywordu kullanılıyor. herhangi bir keyword kullanılmasa da zaten default olarak
public oluyor.*/ 
export default class HomePageClass{
    page: Page //class levelinde bir page instance ı oluşturduk.

    constructor(page: Page){
        this.page = page;
    }

    

}
