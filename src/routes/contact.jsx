import {Form, useLoaderData} from 'react-router-dom';
import {getContact} from "../contacts"


export async function loader({params}){
    return getContact(params.contactId);
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
    let favorite = contact.favorite;

    return(
        <Form method='post'>
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={ favorite ? "Remove from favorites" : "Add to favorites"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}