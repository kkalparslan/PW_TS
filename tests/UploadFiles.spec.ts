import{test,expect} from '@playwright/test';

test("Upload files",async({page,context})=>{    
    await page.goto("https://demoqa.com/upload-download");

    const uploadInput=page.locator("id=uploadFile"); 
    /**Yukarıda dosyayı upload edeceğimiz input u locate ettik */

    await uploadInput.setInputFiles("tests\\UploadFiles\\UploadFile1.pdf");  
    /**Upload edeceğimiz input. dan sonra hazır methodlardan setInputFiles()'ı çağırıyor ve içine
     * upload edeceğimiz dosyanın relative path ini veriyoruz. Ancak windows kullanıcılarının upload
     * işleminde dosya relative path ini verirken çift ters slash \\ kullanmaları gerekiyor.*/                                   

    const uploadFilesField=page.locator("id=uploadedFilePath");
    expect(await uploadFilesField.textContent()).toContain("UploadFile1.pdf");

    /**Bazı inputlar birden fazla dosyayı aynı anda upload etmeye izin verebiliyor. Bu durumda 
     * setInputFiles methodu içine array ile birden fazla dosya yolu vererek yükleyebiliriz. Aşa-
     * ğıdaki adreste artık upload file kısmı olmadığı için test tamamlanamıyor. Bunun için 
     * yeni adrs vereceğim.
    
    const pageTwo=await context.newPage();
    await pageTwo.goto("https://www.foundit.in/");
    const uploadFileInput=pageTwo.locator("//*[@*='heroSection-buttonContainer_secondaryBtn__imgHolder']");
    await uploadFileInput.click();
    const fileUploadInput=pageTwo.locator("id=file-upload");
    await fileUploadInput.setInputFiles("tests\\UploadFiles\\UploadFile2.docx");
    const submitBtn=pageTwo.locator("id=pop_upload");
    await submitBtn.click();
    const pageTwoUploadFileInput=pageTwo.locator("//*[@*='f15']");
    expect(await pageTwoUploadFileInput.textContent()).toContain("UploadFile2.docx"); */
})

test("Multiple files upload",async({page})=>{
    await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");
    const dosyalariSecInput=page.locator("id=filesToUpload");
    await dosyalariSecInput.setInputFiles(["tests\\UploadFiles\\UploadFile1.pdf","tests\\UploadFiles\\UploadFile2.xlsx"]);
  
    let fileNames:string[];
    fileNames=["UploadFile1.pdf","UploadFile2.xlsx"];
  
    const fileArray=page.locator("//ul[@id='fileList']/li");
  
    for(const fileName of fileNames){
     expect(await fileArray.allTextContents()).toContain(fileName);
    }
})

test.only("Downloads",async({page})=>{ /**download işlemini ve doğrulamasını nasıl yapıyoruz */
    await page.goto("https://demoqa.com/upload-download");
 
    const downloadPromise=page.waitForEvent('download'); //await yok çünkü ancak tetiklenince çalışacak
    /**böyle bir event olacağını bildiriyoruz. bu işlem tetiklenince download işlemi gerçekleşecek
     * ve attachment değeri downloadPromise e aktarılacak/ataması yapılacak */
    await page.getByRole('link',{name:"Download"}).click();
    const download=await downloadPromise;/**dovnload promise i await li olarak download isimli bir 
    değişkene atadık.*/

    //console.log(await download.path()); 
    /**path() methodu hata verdi bu nedenle saveAs methodunu kullandım. geçici temprary yolda*/
    console.log(await download.saveAs);

    //await download.saveAs("C:\\Users\\HP\\Downloads\\image.jpeg");
    //indirdiğimiz dosyanın istediğimiz yere yolunu gösterdk.    
    
    const filePath:string="C:\\Users\\HP\\Downloads\\image2.jpeg";
    await download.saveAs(filePath)
 
    const fs= require('fs'); //file system fs-modulü. dosya işelmlerinde kullanılır. burada dosya
    //yazma yada okuma için değil dosya yoluna erişip o dosyanın orada olup olmadığını kontrol etmek
    //için kullanacağız. dosyanın doğru bir şekilde indirilip indirilmediğini kontrol edeceğiz.
    //önce fs i içe aktarmamız, import etmemiz lazım, bir değişkene atayarak yaptık bunu.

    expect(fs.existsSync(filePath)).toBe(true);
 
   // const fs= require('fs'); 
   // expect(fs.existsSync(await dowload.path())).toBe(true);//existxSync kontrol eden methodumuz.
   // temprory yolu kontrol ediyor ama benimki hata vermişti yukarıda. 
 })