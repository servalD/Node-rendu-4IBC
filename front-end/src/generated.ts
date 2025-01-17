import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BasicContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const basicContractAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPayableValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'payableValue',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setPayableValue',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'uint256', type: 'uint256' }],
    name: 'setValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'value',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

export const basicContractAddress =
  '0xDe4166C67C54070f1a0b4D9d60993429c85b3368' as const

export const basicContractConfig = {
  address: basicContractAddress,
  abi: basicContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MyNFTCollection
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const myNftCollectionAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__
 */
export const useReadBasicContract = /*#__PURE__*/ createUseReadContract({
  abi: basicContractAbi,
  address: basicContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"getPayableValue"`
 */
export const useReadBasicContractGetPayableValue =
  /*#__PURE__*/ createUseReadContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'getPayableValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"getValue"`
 */
export const useReadBasicContractGetValue = /*#__PURE__*/ createUseReadContract(
  {
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'getValue',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"payableValue"`
 */
export const useReadBasicContractPayableValue =
  /*#__PURE__*/ createUseReadContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'payableValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"value"`
 */
export const useReadBasicContractValue = /*#__PURE__*/ createUseReadContract({
  abi: basicContractAbi,
  address: basicContractAddress,
  functionName: 'value',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicContractAbi}__
 */
export const useWriteBasicContract = /*#__PURE__*/ createUseWriteContract({
  abi: basicContractAbi,
  address: basicContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setPayableValue"`
 */
export const useWriteBasicContractSetPayableValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setPayableValue',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setValue"`
 */
export const useWriteBasicContractSetValue =
  /*#__PURE__*/ createUseWriteContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicContractAbi}__
 */
export const useSimulateBasicContract = /*#__PURE__*/ createUseSimulateContract(
  { abi: basicContractAbi, address: basicContractAddress },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setPayableValue"`
 */
export const useSimulateBasicContractSetPayableValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setPayableValue',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link basicContractAbi}__ and `functionName` set to `"setValue"`
 */
export const useSimulateBasicContractSetValue =
  /*#__PURE__*/ createUseSimulateContract({
    abi: basicContractAbi,
    address: basicContractAddress,
    functionName: 'setValue',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__
 */
export const useReadMyNftCollection = /*#__PURE__*/ createUseReadContract({
  abi: myNftCollectionAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMyNftCollectionBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadMyNftCollectionGetApproved =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'getApproved',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadMyNftCollectionIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"name"`
 */
export const useReadMyNftCollectionName = /*#__PURE__*/ createUseReadContract({
  abi: myNftCollectionAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMyNftCollectionOwner = /*#__PURE__*/ createUseReadContract({
  abi: myNftCollectionAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadMyNftCollectionOwnerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'ownerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadMyNftCollectionSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMyNftCollectionSymbol = /*#__PURE__*/ createUseReadContract(
  { abi: myNftCollectionAbi, functionName: 'symbol' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"tokenCount"`
 */
export const useReadMyNftCollectionTokenCount =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'tokenCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadMyNftCollectionTokenUri =
  /*#__PURE__*/ createUseReadContract({
    abi: myNftCollectionAbi,
    functionName: 'tokenURI',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__
 */
export const useWriteMyNftCollection = /*#__PURE__*/ createUseWriteContract({
  abi: myNftCollectionAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMyNftCollectionApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: myNftCollectionAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMyNftCollectionMint = /*#__PURE__*/ createUseWriteContract(
  { abi: myNftCollectionAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMyNftCollectionRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: myNftCollectionAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteMyNftCollectionSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: myNftCollectionAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteMyNftCollectionSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: myNftCollectionAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMyNftCollectionTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: myNftCollectionAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMyNftCollectionTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: myNftCollectionAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__
 */
export const useSimulateMyNftCollection =
  /*#__PURE__*/ createUseSimulateContract({ abi: myNftCollectionAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMyNftCollectionApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMyNftCollectionMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMyNftCollectionRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateMyNftCollectionSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateMyNftCollectionSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMyNftCollectionTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link myNftCollectionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMyNftCollectionTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: myNftCollectionAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__
 */
export const useWatchMyNftCollectionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: myNftCollectionAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMyNftCollectionApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myNftCollectionAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchMyNftCollectionApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myNftCollectionAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchMyNftCollectionBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myNftCollectionAbi,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchMyNftCollectionMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myNftCollectionAbi,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMyNftCollectionOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myNftCollectionAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link myNftCollectionAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMyNftCollectionTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: myNftCollectionAbi,
    eventName: 'Transfer',
  })
