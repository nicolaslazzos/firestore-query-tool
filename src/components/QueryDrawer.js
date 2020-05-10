import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  makeStyles,
  Drawer,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon
} from '@material-ui/icons';
import {
  onDataRead
} from '../actions';
import CollectionInput from './CollectionInput';
import WhereInput from './WhereInput';
import ExtraInput from './ExtraInput';
import FirebaseConnection from './FirebaseConnection';

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    overflow: 'auto',
    padding: 15,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
}));

const emptyPathInput = { collectionName: '', documentId: '' };
const emptyWhereInput = { fieldName: '', condition: '', fieldType: '', fieldValue: '' };
const emptyExtraInput = { extraType: '', extraValue: '' };

function QueryDrawer(props) {
  const [pathInputs, setPathInputs] = useState([emptyPathInput]);
  const [whereInputs, setWhereInputs] = useState([emptyWhereInput]);
  const [extraInputs, setExtraInputs] = useState([emptyExtraInput]);

  const classes = useStyles();

  const onPathInputAdd = () => setPathInputs([...pathInputs, emptyPathInput]);

  const onPathInputDelete = index => {
    setPathInputs(pathInputs.filter((item, i) => i !== index));
  };

  const onPathInputChange = ({ prop, value, index }) => {
    setPathInputs(pathInputs.map((item, i) => {
      if (index === i) return { ...item, [prop]: value };
      return item;
    }))
  };

  const onWhereInputAdd = () => setWhereInputs([...whereInputs, emptyWhereInput]);

  const onWhereInputDelete = index => {
    setWhereInputs(whereInputs.filter((item, i) => i !== index));
  };

  const onWhereInputChange = ({ prop, value, index }) => {
    console.log(typeof value)
    setWhereInputs(whereInputs.map((item, i) => {
      if (index === i) return { ...item, [prop]: value };
      return item;
    }))
  };

  const onExtraInputAdd = () => setExtraInputs([...extraInputs, emptyExtraInput]);

  const onExtraInputDelete = index => {
    setExtraInputs(extraInputs.filter((item, i) => i !== index));
  };

  const onExtraInputChange = ({ prop, value, index }) => {
    setExtraInputs(extraInputs.map((item, i) => {
      if (index === i) return { ...item, [prop]: value };
      return item;
    }))
  };

  const onExecutePress = () => {
    props.onDataRead({ pathInputs, whereInputs, extraInputs });
  }

  return (
    <Drawer
      anchor='left'
      open={props.open}
      onClose={props.onClose}
    >
      <div className={classes.drawerContainer}>
        <FirebaseConnection />

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>FROM</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: 'column', alignItems: 'center', padding: 15 }}>
            {
              pathInputs.map((item, index) => {
                return (
                  <CollectionInput
                    collectionName={item.collectionName}
                    documentId={item.documentId}
                    key={index.toString()}
                    onCollectionNameChange={event => onPathInputChange({ prop: 'collectionName', value: event.target.value, index })}
                    onDocumentIdChange={event => onPathInputChange({ prop: 'documentId', value: event.target.value, index })}
                    onDeleteClick={() => onPathInputDelete(index)}
                  />
                );
              })
            }
            <Grid spacing={1} container>
              <Grid xs={12} item>
                <Button variant="contained" color="primary" onClick={onPathInputAdd}>ADD PATH</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>WHERE</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: 'column', alignItems: 'center', padding: 15 }}>
            {
              whereInputs.map((item, index) => {
                return (
                  <WhereInput
                    fieldName={item.fieldName}
                    condition={item.condition}
                    fieldType={item.fieldType}
                    fieldValue={item.fieldValue}
                    key={index.toString()}
                    onFieldNameChange={event => onWhereInputChange({ prop: 'fieldName', value: event.target.value, index })}
                    onConditionChange={event => onWhereInputChange({ prop: 'condition', value: event.target.value, index })}
                    onFieldTypeChange={event => onWhereInputChange({ prop: 'fieldType', value: event.target.value, index })}
                    onFieldValueChange={value => onWhereInputChange({ prop: 'fieldValue', value, index })}
                    onDeleteClick={() => onWhereInputDelete(index)}
                  />
                );
              })
            }
            <Grid spacing={1} container>
              <Grid xs={12} item>
                <Button variant="contained" color="primary" onClick={onWhereInputAdd}>ADD WHERE</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>EXTRA</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ flexDirection: 'column', alignItems: 'center', padding: 15 }}>
            {
              extraInputs.map((item, index) => {
                return (
                  <ExtraInput
                    extraType={item.extraType}
                    extraValue={item.extraValue}
                    key={index.toString()}
                    onExtraTypeChange={event => onExtraInputChange({ prop: 'extraType', value: event.target.value, index })}
                    onExtraValueChange={event => onExtraInputChange({ prop: 'extraValue', value: event.target.value, index })}
                    onDeleteClick={() => onExtraInputDelete(index)}
                  />
                );
              })
            }
            <Grid spacing={1} container>
              <Grid xs={12} item>
                <Button variant="contained" color="primary" onClick={onExtraInputAdd}>ADD EXTRA</Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Button variant="contained" color="primary" style={{ marginTop: 15, alignSelf: 'flex-end' }} onClick={onExecutePress}>EXECUTE QUERY</Button>
      </div>
    </Drawer>
  )
}

export default connect(null, { onDataRead })(QueryDrawer);