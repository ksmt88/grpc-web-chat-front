import React, {Component}         from 'react';
import '../App.css';
import {connect}                  from 'react-redux';
import {Field, reduxForm}         from 'redux-form';
import _                          from 'lodash';
import {getMessages, postMessage} from '../actions/actions';
import {Message}                  from "../proto/chat_pb"

import Container from '@material-ui/core/Container';
import Grid      from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button    from '@material-ui/core/Button';

import List           from '@material-ui/core/List';
import ListItem       from '@material-ui/core/ListItem';
import Avatar         from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText   from '@material-ui/core/ListItemText';

type MessagesProps = {
    messages: any,
    getMessages: any,
    postMessage: any,
}

class MessagesIndex extends Component<MessagesProps> {
    constructor(props: any) {
        super(props);
        this.onPostClick = this.onPostClick.bind(this);
    }

    componentDidMount(): void {
        this.props.getMessages();
    }

    renderMessages() {
        const format = (ts: any) => new Date(ts * 1000).toISOString();

        return _.map(this.props.messages, (message: Message, index) => (
            <ListItem key={index}>
                <ListItemAvatar><Avatar>{message.getName()}</Avatar></ListItemAvatar>
                <ListItemText primary={message.getMessage()} secondary={format(message.getCreatedat()?.getSeconds())}/>
            </ListItem>
        ))
    }

    async onPostClick(args: Message.AsObject) {
        await this.props.postMessage(args);
    }

    renderField(field: any) {
        const {input, label, type} = field;

        return (
            <TextField
                label={label}
                placeholder={label}
                type={type}
                {...input}
                fullWidth={true}
            />
        )
    }

    render() {
        const {handleSubmit}: any = this.props;

        return (
            <React.Fragment>
                <Container fixed>
                    <form onSubmit={handleSubmit(this.onPostClick)}>
                        <Grid container spacing={3}>
                            <Grid item xs container alignContent="center" alignItems="center">
                                <Field label="Name" name="name" type="text"
                                       component={this.renderField}/>
                            </Grid>
                            <Grid item xs={8} container alignContent="center" alignItems="center">
                                <Field label="Message"
                                       name="message"
                                       type="text"
                                       component={this.renderField}/>
                            </Grid>
                            <Grid item xs container alignContent="center" alignItems="center">
                                <Button type="submit"
                                        variant="contained"
                                        color="primary">Send</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <List>
                        {this.renderMessages()}
                    </List>
                </Container>
            </React.Fragment>
        )
    }
}

const validate = (values: any) => {
    const errors = {
        name   : "",
        message: "",
    };

    if (!values.name) {
        errors.name = "Enter a name, please.";
    }
    if (!values.message) {
        errors.message = "Enter a message, please.";
    }

    return errors;
};

const mapStateToProps    = (state: any) => ({messages: state.messages});
const mapDispatchToProps = ({getMessages, postMessage});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm<any, any>({validate, form: 'messageForm'})(MessagesIndex)
)
