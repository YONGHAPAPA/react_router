import {Outlet, NavLink, useLoaderData, Form, redirect} from 'react-router-dom';
import {getContacts, createContact} from '../contacts'

export async function action(){
    const contact = await createContact();
    //return {contact};
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader(){
    const contacts = await getContacts();
    return {contacts};
}

export default function Root(){

    const {contacts} = useLoaderData();

    return(
        <>
            {/* 사이드바 (s) */}
            <div id="sidebar">
            <h1>React Router Contacts</h1>
                <div>
                    {/* 사이드바 상단 검색창 (s) */}
                    <form id="serarch-form" role="search">
                        <input 
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        />
                    </form>
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
            <div id="detail">
                <Outlet />
            </div>
            {/* 우측 본문 (e) */}
        </>
    );
}