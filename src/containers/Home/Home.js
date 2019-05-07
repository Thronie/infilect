import React from 'react';
import Masonry from 'react-masonry-css'
import './Home.css';
import Aux from './../../hoc/Aux';

let noOfCols = Math.floor(window.innerWidth / 200);
let actual = window.innerWidth / 200;
let totalSpace = (actual - noOfCols) / 4;


class Home extends React.Component {

    state = {
        length: 30,
        breakpointCols: noOfCols,
        overlay: false,
        data: null,
        galleryData: []
    }

    getRandomColor = () => {
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    }
    getRandomHeight = (min = 100, max = 300) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    openOverLay = (data) => {
        document.getElementById('div_' + data.id).classList.add('fullscreen');
        this.setState({
            overlay: true,
            data: data
        });
    }

    toggleOverlay = () => {
        document.getElementById('div_' + this.state.data.id).classList.remove('fullscreen');
        document.getElementById('div_' + this.state.data.id).classList.remove('normalScreen');
        this.setState({
            overlay: false
        })
    }

    componentDidMount() {
        let galleryData = [];
        for (let index = 0; index < this.state.length; index++) {
            galleryData.push(
                {
                    id: index,
                    height: this.getRandomHeight(),
                    color: this.getRandomColor()
                }
            );

        }
        this.setState({ galleryData: galleryData }, () => {
            if (this.props.match.params && this.props.match.params.id) {
                let index = galleryData.findIndex(it => {
                    return it.id == this.props.match.params.id;
                })
                this.openOverLay(galleryData[index]);
            }

        });

    }

    logMeOut = () => {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {

        return (
            <Aux>
                <div className="logout">
                    <button onClick={this.logMeOut}>Logout</button>
                </div>
                <div className={this.state.overlay ? 'overlay' : 'none'}>
                    <p onClick={this.toggleOverlay} style={{ display: this.state.overlay ? 'flex' : 'none' }}>&times;</p>
                    <div style={{ display: this.state.overlay ? 'flex' : 'none' }} className="fullscreen">
                    </div>
                </div>
                <Masonry
                    breakpointCols={this.state.breakpointCols}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {this.state.galleryData.map(it => <div id={'div_' + it.id} className="masonry-brick"
                        key={it.id}
                        onClick={() => this.openOverLay(it)}
                        style={{ height: it.height, backgroundColor: it.color, margin: totalSpace + 'px' }}>
                    </div>)}
                </Masonry>
            </Aux>
        );
    };
}

export default Home;