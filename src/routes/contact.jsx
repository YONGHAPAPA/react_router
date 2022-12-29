import {Form, useLoaderData, useFetcher} from 'react-router-dom';
import {getContact, updateContact} from "../contacts"


export async function loader({params}){
    
    //return getContact(params.contactId);
    const contact = await getContact(params.contactId);

    if(!contact){
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        })
    }

    return contact;
}

export async function action({request, params}){
    let formData = await request.formData();
    return updateContact(params.contactId, {favorite: formData.get("favorite") === "true"});
}

export default function Contact(){

    const contact = useLoaderData();

    // contact = {
    //     first: "Your",
    //     last: "Name", 
    //     avatar: "https://placekitten.com/g/200/200", 
    //     twitter: "your_handle", 
    //     notes: "Some notes", 
    //     favorite: true,
    // };

    return (
        <div id="contact">

            {/* 연락처 이미지 (s) */}
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>
            {/* 연락처 이미지 (e) */}


            {/* 연락처 정보 (s) */}
            <div>
                <h1>

                    {/* 연락처 이름 */}
                    {contact.first || contact.last ? (<> {contact.first} {contact.last} </>) : (<i>No Name</i>)}{" "}
                    <Favorite contact={contact} ></Favorite>
                </h1>

                
                {/* 트위터 정보*/}
                {contact.twitter && (
                    <p>
                        <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>{contact.twitter}</a>
                    </p>
                )}

                {/* 트위터 정보*/}
                {contact.notes && <p>{contact.notes}</p>}

                {/* 수정 삭제 버튼*/}
                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event)=>{
                            if(!confirm("Please confirm you want to delete this record")){
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>

            </div>
            {/* 연락처 정보 (e) */}
        </div>
    );
}

function Favorite({contact}){
    const fetcher = useFetcher();
    let favorite = contact.favorite;

    //console.log(`fetcher.formData : ${fetcher.formData}`);
    if(fetcher.formData){
        for(const item of fetcher.formData){
            console.log(`item : ${item}`);
        }
    }
    
    if(fetcher.formData){
        favorite = fetcher.formData.get("favorite") === "true";
    }

    return(
        <fetcher.Form method='post'>
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={ favorite ? "Remove from favorites" : "Add to favorites"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}