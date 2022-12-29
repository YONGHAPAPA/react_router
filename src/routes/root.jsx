import {useEffect, useState} from 'react'
import {Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit} from 'react-router-dom';
import {getContacts, createContact} from '../contacts'

export async function action(){
    const contact = await createContact();
    //return {contact};
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({request}){
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    //console.log(`loader q= ${q}`);

    const contacts = await getContacts(q);

    //console.log(`loader contacts > ${contacts}`);
    //const contacts = await getContacts();
    return {contacts, q};
}

export default function Root(){

    const {contacts, q} = useLoaderData();
    const [query, setQuery] = useState(q);
    const navigation = useNavigation();
    const submit = useSubmit();

    // console.log(`Root q : ${q}`)
    // console.log(`Root query : ${query}`)

    //console.log(`navigation.state : ${navigation.state}`);

    // console.log(`navigation.formAction : ${navigation.formAction}`);
    // console.log(`navigation.formAction : ${navigation.formAction}`);

    // if(navigation.state == "loading"){
    //     console.log(`navigation.location.search : ${navigation.location.search}`);
    //     console.log(`navigation.state : ${navigation.state}`);
    //     console.log(`navigation.formData.values : ${navigation.formData.values[0]}`);
    // }


    
    //console.log(`navigation.location : ${navigation.location}`);
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    //console.log(`searching > ${searching}`);

    useEffect(()=>{
        // console.log(`useEffect q : ${q}`);
        // console.log(`useEffect query : ${query}`);
        //setQuery(q);
        document.getElementById("q").value = q;
    }, [q]);

    return(
        <>
            {/* 사이드바 (s) */}
            <div id="sidebar">
            <h1>React Router Contacts</h1>
                <div>
                    {/* 사이드바 상단 검색창 (s) */}
                    <Form id="serarch-form" role="search">
                        <input 
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            //value={query}
                            onChange={(e)=>{
                                const isFirstSearch = q === null;

                                //setQuery(e.target.value);
                                submit(e.currentTarget.form, {
                                    replace: !isFirstSearch, //location.replace 속성
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        />
                    </Form>
                    {/* 사이드바 상단 검색창 (e) */}

                    {/* 사이드바 상단 New button (s) */}
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                    {/* 사이드바 상단 New button (e) */}
                </div>


                {/* 사이드바 네비 메뉴 */}
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact)=>(
                                <li key={contact.id}>
                                    <NavLink to={`contacts/${contact.id}`} className={({isActive, isPending})=> isActive ? "active" : isPending ? "pending" : ""}>
                                        {contact.first || contact.last ? (<>{contact.first} {contact.last}</>) : (<i>No Name</i>)} {" "} {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                                ))}
                        </ul>
                    ) : (<p><i>No contacts</i></p>)}

                    {/* <ul>
                        <li>
                            <Link to={'contacts/1'}>Your name</Link>
                        </li>
                        <li>
                            <Link to={'contacts/2'}>Your Freind</Link>
                        </li>
                    </ul> */}
                </nav>
            </div>
            {/* 사이드바 (e) */}

            {/* 우측 본문 (s) */}
            <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </div>
            {/* 우측 본문 (e) */}
        </>
    );
}