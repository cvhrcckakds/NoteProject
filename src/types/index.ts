
//formdan alınan note verisinin tipi
export type NoteData={
    title:string;
    markdown: string;
    tags: Tag[];
};

//statede tutulacak note verisinin tipi
//notedata verisini miras alıp yeni değer ekledik
export type Note ={
    id:string;
}   & NoteData;



export type Tag={
    label:string,
    value:string,

}

//Typte tüm değerlerin opsiyonel olmasını istiyorsak: PARTIAL KULLANIP OPSİYONEL OLMASINI İSTEDİĞİÖİZ TİPİ GENERIC OLARAK GÖNDERRİZ
// const note:Partial <Tag>={}