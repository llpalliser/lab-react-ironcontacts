
import { Component } from 'react'
import contacts from '../../contacts.json'


let listedContacts = contacts.splice(0, 5)
let restOfContacts = contacts.slice(5, contacts.length)



class ContactList extends Component {



    state = {
        random: null,
        allContacts: null,
        sortByName: true,
        sortByPopularity: false,
        removed: null

    }

    randomContact = () => {
        const randomNumber = Math.round(Math.random() * (restOfContacts.length - 1));
        if (restOfContacts.length > 0) {
            listedContacts.push(restOfContacts[randomNumber])
            restOfContacts.splice(randomNumber, 1)
            this.setState({ randomNumber })
        }
        else {
            this.setState({ allContacts: true });
        }
    }

    sortContacts = (kind) => {
        if (kind === "name") {
            listedContacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            this.setState({ sortByName: true })
            this.setState({ sortByPopularity: false })

        }
        else if (kind === "popularity") {
            listedContacts.sort((a, b) => (a.popularity < b.popularity) ? 1 : ((b.popularity < a.popularity) ? -1 : 0))
            this.setState({ sortByName: false })
            this.setState({ sortByPopularity: true })
        }
    }

    deleteContact = (index) => {
        restOfContacts.push(listedContacts[index.index])
        listedContacts.splice(index.index, 1)
        this.setState({ removed: index })
        this.setState({ allContacts: false });
    }


    render() {

        const { className } = this.props;
        return (
            <div >
                <button
                    disabled={this.state.allContacts === true}
                    className="btn btn-info m-3"
                    onClick={() => this.randomContact()}>ADD RANDOM CONTACT
                </button>

                <button
                    disabled={this.state.sortByName === true}
                    className="btn btn-info m-3"
                    onClick={() => this.sortContacts('name')}>SORT BY NAME
                </button>

                <button
                    disabled={this.state.sortByPopularity === true}
                    className="btn btn-info m-3"
                    onClick={() => this.sortContacts("popularity")}>SORT BY POPULARITY
                </button>

                <table className={`${className}`}>

                    <thead>
                        <tr>
                            <th className="h3" scope="col">Image</th>
                            <th className="h3" scope="col">Name</th>
                            <th className="h3" scope="col">Popularity</th>
                            <th className="h3" scope="col">Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        {listedContacts.map((contact, index) => (
                            <tr key={listedContacts.id}>
                                <td><img style={{ width: "50px" }} src={contact.pictureUrl} /></td>
                                <td className="h3">{contact.name}</td>
                                <td className="h3" >{contact.popularity}</td>
                                <td>
                                    <button
                                        className="btn btn-danger m-3"
                                        onClick={() => this.deleteContact({ index })}>DELETE
                                        </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ContactList

