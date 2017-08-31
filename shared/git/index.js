// @flow
import * as React from 'react'
import {Box, Text, Icon, ClickableBox, Input, Button} from '../common-adapters'
import {globalStyles, globalColors, globalMargins} from '../styles'

type RowProps = {
  devicename: string,
  lastEdit: string,
  name: string,
  teamname: ?string,
  url: string,
}

type RowAndOwnProps = RowProps & {
  onCopy: (url: string) => void,
  onDelete: (url: string) => void,
}

type RowState = {
  expanded: boolean,
}

class Row extends React.Component<RowAndOwnProps, RowState> {
  _input: any

  state = {
    expanded: Math.random() > 0.5,
  }

  _toggleExpand = () => {
    this.setState(prevState => ({expanded: !prevState.expanded}))
  }

  _inputOnClick = () => {
    this._input && this._input.select()
  }

  _setRef = r => (this._input = r)

  _onCopy = () => {
    this.props.onCopy(this.props.url)
  }

  _onDelete = () => {
    this.props.onDelete(this.props.url)
  }

  render() {
    return (
      <Box
        style={{
          ..._rowStyle,
          ...(this.state.expanded
            ? {
                backgroundColor: globalColors.blue5,
                borderBottomWidth: 1,
                borderColor: globalColors.black_05,
                borderStyle: 'solid',
                borderTopWidth: 1,
              }
            : {}),
        }}
      >
        <ClickableBox
          onClick={this._toggleExpand}
          style={_rowClickStyle}
          hoverColor={globalColors.transparent}
          underlayColor={globalColors.transparent}
        >
          <Box style={_rowTopStyle}>
            <Icon
              type={this.state.expanded ? 'iconfont-caret-down' : 'iconfont-caret-right'}
              style={_iconCaretStyle}
            />
            <Icon
              type={this.props.teamname ? 'iconfont-repo-team' : 'iconfont-repo-personal'}
              style={_iconRepoStyle}
            />
            <Text type="BodySemibold" style={{color: globalColors.darkBlue}}>
              {this.props.teamname ? `${this.props.teamname}/${this.props.name}` : this.props.name}
            </Text>
          </Box>
        </ClickableBox>
        {this.state.expanded &&
          <Box style={_rowBottomStyle}>
            <Box style={globalStyles.flexBoxRow}>
              <Text type="BodySmall" style={{marginTop: 2, marginBottom: 2}}>
                Last push {this.props.lastEdit} ago, signed and encrypted using device&nbsp;
              </Text>
              <Text type="BodySmall" style={_deviceStyle}>{this.props.devicename}</Text>
            </Box>
            <Box style={globalStyles.flexBoxRow}>
              <Box style={_bubbleStyle}>
                <Input
                  small={true}
                  readonly={true}
                  value={this.props.url}
                  onClick={this._inputOnClick}
                  ref={this._setRef}
                  style={_inputStyle}
                  hideUnderline={true}
                />
                <Box style={_copyStyle}>
                  <Icon
                    type={/* temp */ 'iconfont-team-join'}
                    style={{color: globalColors.white, hoverColor: globalColors.grey}}
                    onClick={this._onCopy}
                  />
                </Box>
              </Box>
              <Button type="Danger" label="Delete repo" onClick={this._onDelete} />
            </Box>
          </Box>}
      </Box>
    )
  }
}

const _copyStyle = {
  ...globalStyles.fillAbsolute,
  ...globalStyles.flexBoxCenter,
  backgroundColor: globalColors.blue,
  left: undefined,
  paddingLeft: 12,
  paddingRight: 12,
}

const _inputStyle = {
  width: '100%',
}

const _bubbleStyle = {
  ...globalStyles.flexBoxCenter,
  borderColor: globalColors.blue,
  borderRadius: 20,
  borderStyle: 'solid',
  borderWidth: 1,
  marginRight: 8,
  minHeight: 30,
  minWidth: 430,
  overflow: 'hidden',
  position: 'relative',
}

const _deviceStyle = {
  ...globalStyles.fontBold,
  ...globalStyles.italic,
}

const _rowBottomStyle = {
  ...globalStyles.flexBoxColumn,
  paddingLeft: 22,
}

const _iconCaretStyle = {
  display: 'inline-block',
  fontSize: 12,
  marginBottom: 2,
}

const _iconRepoStyle = {
  color: globalColors.darkBlue,
  marginLeft: 12,
  marginRight: 6,
}

const _rowTopStyle = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
}

const _rowStyle = {
  ...globalStyles.flexBoxColumn,
  minHeight: globalMargins.large,
  padding: globalMargins.tiny,
  paddingTop: 11,
  width: '100%',
}
const _rowClickStyle = {
  ...globalStyles.flexBoxColumn,
}

type Props = {
  onCopy: (url: string) => void,
  onDelete: (url: string) => void,
  personals: Array<RowProps>,
  teams: Array<RowProps>,
}

const Git = (props: Props) => (
  <Box style={_gitStyle}>
    <Box style={_sectionHeaderStyle}>
      <Text type="BodySmallSemibold">Personal repositories</Text>
    </Box>
    {props.personals.map(p => <Row {...p} key={p.url} onCopy={props.onCopy} onDelete={props.onDelete} />)}
    <Box style={_sectionHeaderStyle}>
      <Text type="BodySmallSemibold">Team repositories</Text>
    </Box>
    {props.teams.map(p => <Row {...p} key={p.url} onCopy={props.onCopy} onDelete={props.onDelete} />)}
  </Box>
)

const _sectionHeaderStyle = {
  ...globalStyles.flexBoxRow,
  alignItems: 'center',
  height: 24,
  paddingLeft: globalMargins.tiny,
  width: '100%',
}

const _gitStyle = {
  ...globalStyles.flexBoxColumn,
  height: '100%',
  width: '100%',
}

export default Git